import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import {Resend} from "resend"
import dotenv from "dotenv"

dotenv.config()


const app = express();
const port = process.env.PORT ||  3000


const audienceId =  process.env.AUDIENCE;

app.use(cors());
app.use(bodyParser.json());

const resendAPI = new Resend(process.env.RESEND)

async function addEmail(emailAddress){
	const {data, error} = await resendAPI.contacts.create({
	email : emailAddress,
	unsubscribed : false,
	audienceId : audienceId,
	})
}


app.get('/', (req, res) => {
	res.send('Email Aggregator for https://pushkar.blog');
});

app.post('/subscribe', (req, res) => {
  const { email } = req.body;
  console.log('Received email subscription:', email);
  addEmail(email);
  res.status(200).json({ message: 'Subscription successful' });
});

app.listen(port, () => {
	console.log('server is up and running')
});


