import express from 'express';
import authRoutes from './routes/authRoutes.js'
import './config/passportConfig.js'
import auth from './middleware/auth.js';
import apiRoutes from './api/apiRoutes.js'
import propertyRoutes from './routes/propertyRoutes.js'
import buyersRoutes from './routes/buyersRoutes.js'
import tenantRoutes from './routes/tenantRoutes.js'



const app = express();
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
app.listen(PORT,()=>{
    console.log("Server started on :", PORT)
})