const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// model User {
//     id       Int    @id @default(autoincrement())
//     username String @unique
//     html     String
//     css      String
//     js       String
// }

app.post('/postuser', (request, response) => {
	  const { username, html, css, js } = request.body;
	//   if name is in db, update, else create
	  prisma.user.findUnique({
		  where: {
			  username: username
			}
		}).then((user) => {
			if (user) {
				prisma.user.update({
					where: {
						username: username
					},
					data: {
						html: html,
						css: css,
						js: js
					}
				}).then((user) => {
					response.json(user);
				})
			} else {
				prisma.user.create({
					data: {
						username: username,
						html: html,
						css: css,
						js: js
					}
				}).then((user) => {
					response.json(user);
				})
			}
		})
})



app.post('/getuser', (request, response) => {
	  const { username } = request.body;
	  prisma.user.findUnique({
		  where: {
			  username: username
			}
		}).then((user) => {
			response.json(user);
		})
})


app.listen(3000);
