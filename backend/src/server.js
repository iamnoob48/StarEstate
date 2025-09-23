import express from 'express';
import authRoutes from './routes/authRoutes.js'
import './config/passportConfig.js'
import auth from './middleware/auth.js';
import apiRoutes from './api/apiRoutes.js'
import propertyRoutes from './routes/propertyRoutes.js'
import buyersRoutes from './routes/buyersRoutes.js'
import tenantRoutes from './routes/tenantRoutes.js'
import http from 'http'
import {Server} from 'socket.io'
import prisma from './prismaClient.js';



const app = express();

//For using websocket
const server = http.createServer(app);

let users = {}

//For socket.io connection
const io = new Server(server, {
    cors : {
        origin : '*'
    }
})

io.on('connection', async (socket)=>{
    console.log(socket.id);

    socket.on('register', async(userId)=>{
        users[userId] = socket.id;
        console.log(`${userId} is registered with the socket id ${socket.id}`)
        //For fetching messages
        const messages = await prisma.message.findMany({
            where : {
                OR: [
                    { senderId: parseInt(userId) },
                    { receiverId: parseInt(userId) }
                ]
            },
            orderBy : {createdAt : 'asc'},
            take : 50

        })
        socket.emit('previous_messages', messages);

    })
    //For sending message
    socket.on("send_message", async ({senderId, receiverId, text})=>{
        console.log("send_message args:", senderId, receiverId, text);
        try {
            const message = await prisma.message.create({
                data : {
                    receiverId : parseInt(receiverId),
                    senderId : parseInt(senderId),
                    content : text
                }



            })
            const recieverSocket = users[receiverId];
            if(recieverSocket){
                io.to(recieverSocket).emit("receive_message",message);
            }
            
        } catch (error) {
            console.log(error)
        }

    })

    //For disconnecting when offline
    socket.on('disconnect', ()=>{
        console.log('Socket disconnected', socket.id)
        for(let userID in users){
            if(users[userID]=== socket.id){
                delete users[userID];
                break;
            }
        }
    })
})


const PORT = process.env.PORT || 4000



app.use(express.json());

app.use('/auth', authRoutes)

app.use('/api',auth, apiRoutes)
//Buyers Route
app.use('/buyersData',buyersRoutes)
//Tenant Routes
app.use('/tenantData', tenantRoutes)
//CRUD routes
app.use('/property', auth, propertyRoutes)



app.get('/', (req,res)=>{
    res.send(`<h1>Hello world</h1>`)
})
server.listen(PORT,()=>{
    console.log("Server started on :", PORT)
})