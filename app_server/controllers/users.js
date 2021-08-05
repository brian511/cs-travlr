/* GET homepage */

const users = (req, res) => {
    res.render('users', { title: 'Travlr Getaways' });
};
module.exports = {
    users
};
