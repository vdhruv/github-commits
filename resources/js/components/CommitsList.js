import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Badge, Table} from "react-bootstrap";

const CommitsList = props => {
    return (
        <Table striped bordered hover>
            <tbody>
            {props.commits.length > 0 && props.commits.map(commit => (
                <tr>
                    <td className={"py-3"}>
                        <div className="d-flex">
                            <div className="content flex-fill">
                                <p className={"mb-2"}>{commit.short_message}</p>
                                <small>committed by {commit.author}, {commit.committed_ago}</small>
                            </div>

                            <div className="">
                                {commit.is_verified ?
                                    <Badge bg="success">Verified</Badge> :
                                    <Badge bg="danger">Not verified</Badge>}
                            </div>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}
CommitsList.propTyeps = {
    commits: PropTypes.array.isRequired
}

export default CommitsList;