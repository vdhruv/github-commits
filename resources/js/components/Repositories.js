import React from "react";
import {Table} from "react-bootstrap";
import PropTypes from 'prop-types'
import Repository from "./Repository";

const Repositories = props => {
    return (
        <Table striped bordered hover>
            <tbody>
            {props.repositories.length > 0 ? props.repositories.map(repository =>
                <Repository repository={repository} key={repository.id}/>) : (
                <tr className="text-center">
                    <td> No repositories found.</td>
                </tr>
            )}
            </tbody>
        </Table>
    )
}

Repositories.propTypes = {
    repositories: PropTypes.array.isRequired
}

export default Repositories;