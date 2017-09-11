const router = require('express').Router(),
      async = require('async'),
      auth = require('../config/auth'),
      handler = require('../utils/handler');

const User = require('../database/user'),
      Student = require('../database/student'),
      Team = require('../database/team');

router.post('/', auth.verifyJWT, (req, res) => {
  const { team } = req.body;
  if (!team) handler(false, 'Empty team received.', 400)(req, res);
  Student.create(team.members, (err, members) => {
    if (err) handler(false, 'Failed to save team members.', 503)(req, res);
    else {
      const newTeam = Object.assign(new Team(), team, { members });
      newTeam.save(err => {
        if (err) handler(false, 'Failed to save team.', 503)(req, res);
        else {
          req.user.teams.push(newTeam);
          req.user.save(err => {
            if (err) handler(false, 'Failed to save team to user.', 503)(req, res);
            else handler(true, 'Successfully saved team.', 200, { team: newTeam })(req, res);
          });
        }
      });
    }
  });
});

router.put('/:team_id', auth.verifyJWT, (req, res) => {
  const { team: newTeam } = req.body, 
        { team_id } = req.params;
  if (!newTeam) handler(false, 'Empty team received.', 400)(req, res);
  Team.findById(team_id, (err, team) => {
    if (err) handler(false, 'Failed to load team.', 503)(req, res);
    else {
      if (req.user.teams.indexOf(team._id.toString()) === -1) {
        handler (false, 'Unauthorized put request.', 401)(req, res);
      } else {
        const remaining = newTeam.members.filter(member => member._id),
              newMembers = newTeam.members.filter(member => !member._id),
              remainingId = remaining.map(member => member._id);
              goneMembers = team.members.filter(
                member => (remainingId.indexOf(member.toString()) === -1)
              ) || [];
        delete newTeam.members;
        Object.assign(team, newTeam); // assign new team properties
        
        const tasks = remaining.map(member => {
          return callback => {
            Student.findById(member._id, (err, oldMember) => {
              delete member._id;
              Object.assign(oldMember, member);
              oldMember.save(err => {
                if (err) callback(err, null);
                else callback(null, null);
              });
            });
          }
        });

        async.parallel(tasks, (err, results) => {
          if (err) handler(false, 'Failed to updated existing members.', 503)(req, res);
          else {
            Student.create(newMembers, (err, members) => {
              if (err) handler(false, 'Failed to create new members.', 503)(req, res);
              else {
                Student.remove({ _id: { $in: goneMembers } }, err => {
                  if (err) handler(false, 'Failed to delete old members.', 503)(req, res);
                  else {
                    team.members = remainingId.concat(members || []);
                    team.save(err => {
                      if (err) handler(false, 'Failed to save new team.', 503)(req, res);
                      else {
                        Student.populate(team, 'members', (err, team) => {
                          if (err) handler(false, 'Failed to load members.', 503)(req, res);
                          else handler(true, 'Successfully updated team.', 200, { team })(req, res);
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  });
});

router.delete('/:team_id', auth.verifyJWT, (req, res) => {
  const { team_id } = req.params;
  Team.findById(team_id, (err, team) => {
    if (err) handler(false, 'Failed to load team.', 503)(req, res);
    else if (!team) handler(false, 'Team does not exist.', 400)(req, res);
    else {
      if (req.user.teams.indexOf(team._id.toString()) === -1) {
        handler (false, 'Unauthorized delete request.', 401)(req, res);
      } else {
        Student.remove({ _id: { $in: team.members } }, err => {
          if (err) handler(false, 'Failed to remove students.', 503)(req, res);
          else {
            team.remove(err => {
              if (err) handler(false, 'Failed to remove team.', 503)(req, res);
              else handler(true, 'Successfully removed team.', 200, { team_id })(req, res);
            });
          }
        });
      }
    }
  });
});

module.exports = router;
