import * as React from 'react'
import {
    Link, useHistory
} from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/header'
import { getMemoPageCount, getMemos, MemoRecord } from '../indexeddb/memos'

const { useState, useEffect } = React;

const HeaderArea = styled.div`
    position: fixed;
    top:0;
    right:0;
    left:0;
`;

const Wrapper = styled.div`
    position: fixed;
    top: 3rem;
    left: 0;
    right: 0;
    bottom: 3rem;
    padding: 0 1rem;
    overflow-y: scroll;
`;

const Memo = styled.button`
    display: block;
    width:100%;
    padding: 1rem;
    margin: 1rem 0;
    border: 1px solid gray;
    background: white;
    text-align: left;
`;

const MemoTitle = styled.div`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`;

const MemoText = styled.div`
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Paging = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3rem;
    line-height: 2rem;
    padding: 0.5rem;
    text-align: center;
`;

const PagingButton = styled.button`
    display: inline-block;
    background: none;
    border: none;
    height: 2rem;
    padding: 0.5rem 1rem;

    &:disabled {
        color: silver;
    }
`;

interface Props {
    setText: (text: string) => void
}

export const History: React.FC<Props> = (props) => {
    const { setText } = props;
    const [memos, setMemos] = useState<MemoRecord[]>([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const history = useHistory();
    useEffect(() => {
        getMemos(1).then(setMemos);
        getMemoPageCount().then(setMaxPage);
    }, []);

    const canNextPage: boolean = page < maxPage;
    const canPrevPage: boolean = page > 1;
    const movePage = (targetPage: number) => {
        if (targetPage < 1 || maxPage < targetPage) return;
        setPage(targetPage);
        getMemos(targetPage).then(setMemos);
    }

    return (
        <>
            <HeaderArea>
                <Header title="履歴">
                    <Link to="/editor">エディタに戻る</Link>
                </Header>
            </HeaderArea>
            <Wrapper>
                {
                    memos.map((memo) => {
                        return (
                            <Memo key={memo.datetime} onClick={() => {
                                setText(memo.text)
                                history.push('/editor')
                            }}>
                                <MemoTitle>{memo.title}</MemoTitle>
                                <MemoText>{memo.text}</MemoText>
                            </Memo>
                        )
                    })
                }
            </Wrapper>
            <Paging>
                <PagingButton onClick={() => movePage(page - 1)} disabled={!canPrevPage}>
                    prev
                </PagingButton>
                {page} / {maxPage}
                <PagingButton onClick={() => movePage(page + 1)} disabled={!canNextPage}>
                    next
                </PagingButton>
            </Paging>
        </>
    )
}