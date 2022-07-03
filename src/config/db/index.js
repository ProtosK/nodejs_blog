const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/blog_education_dev',);
        console.log('connect success database')
    } catch (error) {
        console.log('connect fail!!!')
    }
}

module.exports = { connect };