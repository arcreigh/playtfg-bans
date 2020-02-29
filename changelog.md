0.0.4 - 2/29/2020</br>
--General--</br>
Implemented authentication on all remaining routes.</br>
Implemented admin checks for users.</br>
</br>
0.0.3 - 2/28/2020</br>
--General--</br>
Implemented persistant session handling with connect-mongo</br>
Sessions will be stored in a session collection within your mongo database these will be</br>
magically managed by connect-mongo.</br>
--Dependancy Changes--</br>
connect-mongo version 3.2.0 was added to the project</br>
express-session version 1.17.0 was added to the project</br>
</br>
0.0.2 - 2/27/2020</br>
--General--</br>
Implemented steam user addition to mongoDB</br>
Authentication has not yet been implemented, but passport-steam is successfully handing off requests to steam and steam is bringing them back to the root of the site. Additionally data is being stored in the users collection and will be updated on login should a user change their steam username.</br>
--Dependancy Changes--</br>
config package updated to 3.3.0 from 3.2.6</br>
helmet package updated to 3.21.3 from 3.21.2</br>
mongoose package updated to 5.9.2 from 5.9.1</br>
passport package version 0.4.1 was added to the project</br>
</br>
0.0.1 - Initial version release
