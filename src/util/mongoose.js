module.exports = {
    //do handlebars trả về 1 obj constructor nên phải toObject thường thì mới dùng được this.
    //nhiều phần tử
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    //1 phần tử
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};