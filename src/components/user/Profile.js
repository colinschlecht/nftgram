import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Body from "./Body";
import { showUser } from "../../actions";
import { Segment, Header as Head } from "semantic-ui-react";

const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const resp = await showUser(match.params.id);
      setUser(resp.data);
    };
    getUser();
  }, [match, dispatch]);

  return (
    <div className="profile container">
      <Head attached="top" block></Head>
      <Segment attached>
        <Header user={user} />
        <Body user={user} />
      </Segment>
      <Head attached="bottom" block>

      </Head>
    </div>
  );
};
export default Profile;
