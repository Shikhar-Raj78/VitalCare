const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [8, "Password must be atleast 8 characters"],
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "Rather Not Say",
    },
    address: {
      type: String,
      required : true
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// userSchema.pre("save", async function (next) { ... }):

// This sets up a pre middleware for the save operation on the Mongoose schema named userSchema.
// The pre middleware means this function runs before the document is actually saved to the database.
// It is asynchronous, indicated by the async keyword, allowing the use of await for asynchronous operations.
// if (!this.isModified("password")) { return next(); }:

// this refers to the current document (or record) that is about to be saved.
// this.isModified("password") checks if the password field of the document has been modified since it was last saved or created.
// If the password field has not been modified, the function calls next() immediately to proceed with saving the document without any changes to the password.
// This check prevents unnecessary re-hashing of the password if it hasn't changed, which is useful when updating other fields of the user document.
// const salt = await bcrypt.genSalt(10);:

// bcrypt is a library used to hash passwords securely.
// bcrypt.genSalt(10) generates a salt for hashing the password. A salt is a random string that is added to the password before hashing to ensure that even if two users have the same password, their hashed passwords will be different.
// 10 is the number of salt rounds. It defines the computational complexity of the hashing process. More rounds make it more secure but also slower.
// await pauses the execution until bcrypt.genSalt completes, ensuring that the generated salt is available for the next step.
// const hashedPassword = await bcrypt.hash(this.password, salt);:

// bcrypt.hash(this.password, salt) hashes the user's password using the generated salt.
// this.password is the plaintext password of the user from the document.
// The await keyword ensures that the code waits until the password hashing process is complete before proceeding.
// this.password = hashedPassword;:

// This assigns the hashed password to the password field of the document.
// After this step, the document's password field no longer contains the plaintext password; instead, it contains a hashed version of the password.
// next();:

// This function call indicates that the middleware processing is complete, and it’s okay to proceed with saving the document to the database.
// Without calling next(), the save operation would be stalled indefinitely, leading to a hanging or timeout in the application.
// Key Points
// Password Security: Storing plaintext passwords in the database is a significant security risk. If the database is compromised, attackers could easily access user accounts. Hashing the password with a salt ensures that even if someone gains access to the database, they won’t be able to determine the original passwords easily.

// Salt and Hashing: Using a salt in combination with the hash function makes it more difficult for attackers to use precomputed tables (rainbow tables) to reverse-engineer the passwords from their hashes.

// Efficiency: By checking this.isModified("password"), the code efficiently hashes the password only when it has actually been changed, avoiding unnecessary computations.