import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
    const router = useRouter();

    async function addMeetUpHandler(enteredMeetupData) {
        // send HTTP request
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);

        router.push('/')
    }

    return <Fragment>
            <Head>
                <title>Add a New Meetups</title>
                <meta
                    name="description"
                    content="Add your own meetups and create amazing opportunities"
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetUpHandler}/>
        </Fragment>
}

export default NewMeetup;