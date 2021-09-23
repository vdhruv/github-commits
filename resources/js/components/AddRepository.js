import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import PropTypes from "prop-types";

const AddRepository = props => {
    const [name, setName] = useState('');
    const [repoName, setRepoName] = useState('');

    return (
        <Form onSubmit={async (e) => {
            props.onSubmit(e, name, repoName)
            setName('');
            setRepoName('');
        }}>
            <Row>
                <Col>
                    <Form.Control required placeholder="Owner name" value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>
                <Col>
                    <Form.Control required placeholder="Repository name" value={repoName} onChange={(e) => setRepoName(e.target.value)}/>
                </Col>
                <Col>
                    <Button variant="primary" type="submit" disabled={props.isLoading}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

AddRepository.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default AddRepository;