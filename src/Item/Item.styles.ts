import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border-radius: 10px;
    min-height: 500px;

    .max-title {
        display: block;
        text-overflow: ellipsis;
        word-wrap: break-word;
        overflow: hidden;
        max-height: 2.4em;
        line-height: 1.2em;
    }
    .max-lines {
        display: block;
        text-overflow: ellipsis;
        word-wrap: break-word;
        overflow: hidden;
        max-height: 3.6em;
        line-height: 1.2em;
        color: grey;
    }
    
    button {
        border-radius: 0 0 10px 10px;
        background-color: rgba(0,0,0,0.2);
    }
    button:active{
        background-color: rgba(0,0,0,0.2);
    }

    img {
        height: 250px;
        border-radius: 10px 10px 0 0;
        object-fit: cover;
    }

    div{
        font-family: Arial, Helvetica, sans-serif;
        padding: 1rem;
        height: 100%;
    }
`;