0.0.2 - 2/27/2020
--General--
Implemented steam user addition to mongoDB
Authentication has not yet been implemented, but passport-steam is successfully handing off requests to steam and steam is bringing them back to the root of the site. Additionally data is being stored in the users collection and will be updated on login should a user change their steam username.
--Dependancy Changes--
config package updated to 3.3.0 from 3.2.6
helmet package updated to 3.21.3 from 3.21.2
mongoose package updated to 5.9.2 from 5.9.1
passport package version 0.4.1 was added to the project

0.0.1 - Initial version release
