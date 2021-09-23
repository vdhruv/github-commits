import React from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

const Repository = props => {
    const history = useHistory();

    return (
        <tr key={props.repository.id}>
            <td className={"py-3"}>
                <div className={"d-flex"}>
                    <div className="content flex-fill">
                        <p
                            className={"mb-2 btn-link"}
                            style={{cursor: 'pointer'}}
                            onClick={() => history.push(`/repository/${props.repository.id}`)}
                        >
                            {props.repository.full_name}
                        </p>

                        <small>{props.repository.description}</small>
                    </div>

                    <div className="commits">
                        {props.repository.commits_count} commits
                    </div>
                </div>
            </td>
        </tr>
    );
}

Repository.propTypes = {
    repository: PropTypes.object.isRequired,
}

export default Repository;