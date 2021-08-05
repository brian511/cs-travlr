/*GET homepage */
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('.data/trips.json', "utf8"))

/* Get travel view */
const travel = (req, res) => {
    res.render('index', { title: 'Travlr Getaways', trips });
};
module.exports = {
    travel
};
