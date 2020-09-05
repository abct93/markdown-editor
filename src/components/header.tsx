import * as React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
    display: flex;
    align-content: center;
    justify-content: space-between;
    height: 2rem;
    line-height: 2rem;
    padding: 0.5rem 1rem;
`;

const HeaderTitle = styled.div`
    font-size: 1.5rem;
`;

const HeaderControl = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    height: 2rem;
    & > * {
        margin-left: 0.5rem;
    }
`;

interface Props {
    title: string
    children: React.ReactNode
}

export const Header: React.FC<Props> = (props) => {
    return (
        <HeaderWrapper>
            <HeaderTitle>{props.title}</HeaderTitle>
            <HeaderControl>{props.children}</HeaderControl>
        </HeaderWrapper>
    )
}