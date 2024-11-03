import styled from "styled-components";

export const PostFormContainer = styled.div`
  margin-top: 120px; /* 헤더 높이만큼 margin-top 추가 */
`;

export const Section = styled.div`
  margin-top: 30px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px 0px;
  flex-wrap: wrap;
`;

export const FormColumn = styled.div`
  min-width: 600px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  margin-top: 40px;
  margin-bottom: 50px;
`;