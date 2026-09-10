// backend/src/controllers/authController.js
const bcrypt = require("bcryptjs");
const prisma = require("../config/db");
const { generateToken } = require("../utils/tokenHelper");
const { success, error } = require("../utils/responseHelper");

/**
 * Register a new user
 */
async function register(req, res) {
  try {
    const { name, email, password, role = "STUDENT", college, branch, careerGoal } = req.body;

    if (!name || !email || !password) {
      return error(res, "Name, email, and password are required.", 400);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return error(res, "An account with this email already exists.", 409);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: role.toUpperCase()
      }
    });

    // If student, initialize profile
    let studentProfile = null;
    if (user.role === "STUDENT") {
      studentProfile = await prisma.studentProfile.create({
        data: {
          userId: user.id,
          college: college || "Institute of Technology",
          branch: branch || "Computer Science",
          careerGoal: careerGoal || "Data Analyst",
          readinessScore: 75
        }
      });
    }

    const token = generateToken({ userId: user.id, role: user.role });

    return success(
      res,
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        studentProfile
      },
      "Account registered successfully.",
      201
    );
  } catch (err) {
    console.error("Registration error:", err);
    return error(res, "Failed to register account.", 500);
  }
}

/**
 * Login existing user
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return error(res, "Email and password are required.", 400);
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        studentProfile: true
      }
    });

    if (!user) {
      return error(res, "Invalid email or password.", 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return error(res, "Invalid email or password.", 401);
    }

    const token = generateToken({ userId: user.id, role: user.role });

    return success(
      res,
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        studentProfile: user.studentProfile
      },
      "Login successful."
    );
  } catch (err) {
    console.error("Login error:", err);
    return error(res, "Login failed.", 500);
  }
}

/**
 * Get authenticated user profile
 */
async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        studentProfile: true
      }
    });

    return success(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      studentProfile: user.studentProfile
    });
  } catch (err) {
    console.error("getMe error:", err);
    return error(res, "Failed to fetch user data.", 500);
  }
}

/**
 * Logout
 */
function logout(req, res) {
  return success(res, {}, "Logged out successfully.");
}

module.exports = {
  register,
  login,
  getMe,
  logout
};
