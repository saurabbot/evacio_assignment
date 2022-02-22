# evacio_assignment
# FreeNtory
A nodeJS web application to manage bag for a ecovian and store it in separate sections of the inventory to move the load across the inventory with ease also we can send bags to other ecovians.



## Installation
Clone the app the first.
for installation use npm.

```bash
npm install
```
this will install all the necessary packages to clone the app.

## Appraoch
For user authentications i have used passportjs .

User will have an attribute called bucket(Array) to store the bags the other ecovians are sending him.

Every inventory also has an attribute called bags which is an array to store the bags of that inventory.



## Built With.
Front-end
ejs 
Bootstrap
Back-end
express
mongoDB
mongoose
passport
passport-local
express-session
method-override


## Inventory 
The inventory is sectioned on the frontend into divs basically its shown as
if bag.status == 'damage' then all damage bags are shown and so on.

