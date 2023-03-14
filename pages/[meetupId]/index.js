import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
    return (
    <Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta
                name="description"
                content={props.meetupData.description}
            />
        </Head>
        <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        />
    </Fragment>
    )
}


// dynamic paths
export async function getStaticPaths() {
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://minh:Minhanh1309@cluster0.zsj0e8v.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    // fetch data ONLY contain _id NOTHING ELSE
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

    client.close();
     
    return {
        fallback: 'blocking',    // ko can co gang pre-render nhung page khac ngoai m1, m2 for the incomming request
        paths: meetups.map(meetup => ({
            params: {meetupId: meetup._id.toString()}
        }))
        // [
        //     {
        //         params: {
        //             meetupId: 'm1'
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: 'm2'
        //         }
        //     }, 
        // ]
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    console.log(meetupId);

    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://minh:Minhanh1309@cluster0.zsj0e8v.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)});

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails;