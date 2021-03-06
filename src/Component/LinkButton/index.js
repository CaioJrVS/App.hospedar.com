import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const LinkWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dc3545;
    padding: 0 12px 0 12px;
    border-radius: 5px;
    height: 40px;
    transition: 0.3s;
    cursor: pointer;

    a {
        color: white;
        text-decoration: none;
        font-size: 16px;
    }

    :hover {
        background-color: #dc3545da;
    }
`

class LinkButton extends React.Component {
    render() {
        console.log(this.props)
        return(
            <LinkWrapper >
                <Link type="submit" to={{
                    pathname: this.props.href,
                    state: this.props.fields
                }}
                >{this.props.name}</Link>
            </LinkWrapper>
        )
    }
}

export default LinkButton;