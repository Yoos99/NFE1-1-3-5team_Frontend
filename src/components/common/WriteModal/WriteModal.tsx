import {
  Overlay,
  StyledWriteModal,
  ButtonWrapper,
  ModalButton,
  ButtonContent,
  ButtonText,
  ButtonContentTitle,
  ButtonDescription,
  CloseButton,
} from "./WriteModal.styles";

import ProjectIcon from "../icon/ProjectIcon/ProjectIcon";
import MeetIcon from "../icon/MeetIcon/MeetIcon";
import StudyIcon from "../icon/StudyIcon/StudyIcon";
import { Link } from "react-router-dom";

interface WriteModalProps {
  label?: string;
  onClick?: () => void;
}

interface ModalButtonProps {
  title: string;
  IconComponent: React.ComponentType;
  buttonTitle: string;
  buttonContent: string;
}

const ModalButtonComponent = ({
  title,
  IconComponent,
  buttonTitle,
  buttonContent,
}: ModalButtonProps) => (
  <ModalButton>
    <ButtonContent>
      <ButtonText>{title}</ButtonText>
      <ButtonContentTitle>{buttonTitle}</ButtonContentTitle>
      <ButtonDescription>{buttonContent}</ButtonDescription>
      <IconComponent />
    </ButtonContent>
  </ModalButton>
);

const WriteModal = ({ onClick }: WriteModalProps) => {
  return (
    <Overlay>
      <StyledWriteModal>
        <CloseButton onClick={onClick} />
        <ButtonWrapper>
          <Link to="/post/create/project">
            <ModalButtonComponent
              title="프로젝트"
              IconComponent={ProjectIcon}
              buttonTitle="팀을 이끌고 싶다면 프로젝트!"
              buttonContent="아이디어를 실현할 동료를 모집해 보세요."
            />
          </Link>

          <Link to="/post/create/study">
            <ModalButtonComponent
              title="스터디"
              IconComponent={StudyIcon}
              buttonTitle="함께 성장하고 싶다면 스터디!"
              buttonContent="같은 목표를 가진 사람들과 함께 배워요."
            />
          </Link>
          <Link to="/post/create/meet">
            <ModalButtonComponent
              title="Meet!"
              IconComponent={MeetIcon}
              buttonTitle="나를 보여주고 싶다면 Meet!"
              buttonContent="능력을 소개하고 팀의 제안을 받아보세요."
            />
          </Link>
        </ButtonWrapper>
      </StyledWriteModal>
    </Overlay>
  );
};

export default WriteModal;
