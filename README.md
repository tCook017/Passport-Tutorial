# Passport-Tutorial

[Official Passport Documentation](http://www.passportjs.org/docs/)

Passport is authentication middleware which is respectful of your node project.

# Modules/Middleware
- body-parser
- cookie-parser
- express-session
- passport.initialize
- passport.session
- passport-local (optional, commonly-used and configurable strategy)
- connect-flash (optional, for displaying alerts or “flash messages” which can be used to indicate a successful or failed authentication)

# Cookies
Information stored client-side that contains information about a user and their session. The client’s cookie is sent to validate their identity for specified requests.

# Serialization/Deserialization
The process of converting a user and their credentials into a cookie (server to client) or vice versa (client to server).

# Passport Configuration
- Authentication strategies
  * Strategies in our case will be used to verify the name and password of a user.
- Application middleware
  * We use an `ensureAuthentication` function as middleware to prevent unauthorized access to sites. 
- Sessions
  * We use sessions so that the client does not have to pass a name and password with each request; their authorization is stored in a cookie, which is passed back and forth.
  * Note: We only serialize users' ids, but mutliple other object attributes could be used instead or in addition.

# Strategies
Most people use the passport-local strategy (including the Passport documentation, as it is written by the creator of Passport) as a foundation which can be further configured.

# Notable Methods
- `done(err, object, { message })`
  * A method which passes to Passport the authenticated user or delivers an error message.
  * Example: `return done(null, user)` indicates a successful authentication.
  * Example 2: `return done(err, false, { message: ‘Incorrect credentials’ }` indicates an error (assuming ‘err’ isn’t null) and delivers the reason for failure in ‘message’ (which may be flashed to the user if ‘failureFlash’ is set to true in the options of `passport.authenticate()`.
- `passport.authenticate(‘strategy’, { options })`
  * This function calls a login function automatically.
  * It is used to create the session.
