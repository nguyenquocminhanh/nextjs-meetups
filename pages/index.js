import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Una_iglesia_evangelica_de_guayana_francesa_%2C.jpg',
        address: '9 Lonsdale St, Apt 3, Boston, MA',
        description: 'This is a first meetup!'
    },

    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Track-5.jpg',
        address: '10 Lonsdale St, Apt 3, Boston, MA',
        description: 'This is a second meetup!'
    }
]

function HomePage(props) {
    return <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta
                name="description"
                content="Browse a huge list of highly activereact meetups "
            />
        </Head>
        <MeetupList meetups={props.meetups}/>
    </Fragment>
}

// this code is priority executed before above component
// this code is executed during build process, NOT on the SERVER and not on the CLIENTS of the visitor
export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://minh:Minhanh1309@cluster0.zsj0e8v.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }; 
}


// export async function getServerSideProps(context) {
//     // access to incoming request
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;