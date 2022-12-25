import styled from "styled-components";
import IconButton from '@mui/material/IconButton';

export const Wrapper = styled.div`
    margin: 40px;
`;

export const StyledButton = styled(IconButton)`
    position: sticky;
    color: #f0f0f0;
    transform: scale(1.1);
    transition: all 0.2s;
`;