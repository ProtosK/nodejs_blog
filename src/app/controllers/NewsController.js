// class là function contructor chứa các method
class NewsController {

    //[GET] /news
    index(req, res) {
        res.render('news');
    }

    //[GET] /news/:slug
    show(req, res) {
        res.send('show');
    }

}

module.exports = new NewsController;