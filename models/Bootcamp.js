const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocode");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxLength: [50, "Name cannot be more than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxLength: [500, "Description cannot be more than 500 characters"],
  },
  website: {
    type: String,
    match: [
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      "Please use a valid url with HTTP or HTTPS",
    ],
  },
  phone: {
    type: String,
    maxLength: [20, "Phone number cannot be longer than 20 characters"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email address",
    ],
  },
  address: {
    type: String,
    required: [true, "Please add a address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: [String],
    require: true,
    enum: [
      "Web Development",
      "Software Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  avgRating: {
    type: Number,
    min: [1, "Rating must be atleast 1"],
    max: [10, "Rating must be atleast 1"],
  },
  avgCost: Number,
  photo: {
    type: String,
    default: "no-default.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Create slug for bootcamp from the name
BootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Geocode and create location field
BootcampSchema.pre("save",  async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  }

  //Do not save address in db
  this.address = undefined
  next();
})

module.exports = mongoose.model("Bootcamp", BootcampSchema);