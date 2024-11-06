import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderContainer, NavContainer, LogoContainer } from "./Header.styles";

import Logo from "../../common/Logo/Logo";
import NotificationIconContainer from "./NotificationIconContainer/NotificationIconContainer";
import ProfileImage from "../../common/ProfileImage/ProfileImage";
// import NotificationIcon from "../../common/icon/NotificationIcon/NotificationIcon";
import ContactIcon from "../../common/icon/ContactIcon/ContactIcon";
import Button from "../../common/button/Button";
import BackIcon from "../../common/icon/BackIcon/BackIcon";
import ProfileDropdown from "../../features/profileDropdown/ProfileDropdown";

import DummyProfileImage from "../../../assets/profile-image/Dummy-Profile-Image.png";
import LoginModal from "../../features/login/LoginModal";
import RegisterModal from "../../features/register/RegisterModal";
import ProfileProposal from "../../features/register/ProfileProposal";
import useModal from "../../../hooks/useModal";
import useAuthStore from "../../../store/useAuthStore";
import useChatUnread from "../../../hooks/Chat/useChatUnread";

/**
 * 로그인 안 되 었을 때
 * 로그인 버튼 onClick 시 로그인 모달 띄우기
 *
 * 로그인 되었을 때 (각 요소들 버튼으로 만들기)
 * Chat Icon 클릭시 채팅 페이지로 이동
 * Notificatoin Icon 클릭시 알림 모달
 * Profile Image 클릭시 마이페이지로 이동
 */

interface HeaderProps {
  isMainPage: boolean;
  isChatPage: boolean;
}
const Header = ({ isMainPage, isChatPage }: HeaderProps) => {
  const navigate = useNavigate();
  const {
    isLogin,
    isModalOpen,
    isLoginView,
    showProfileProposal,
    handleClick,
    handleCloseModal,
    toggleModalView,
    handleLoginSuccess,
    handleCloseProfileProposal,
  } = useModal();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  //채팅 unread msg 개수 관련 커스텀 훅
  const userId = useAuthStore((state) => state.email); // 현재 로그인한 유저 아이디
  const unreadCount = useChatUnread(userId);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  // 로그인 상태, notificationCount 등은 전역 상태 관리를 통해 관리할 예정

  // navigate 방식 Link 방식 다시 확인
  // const navigate = useNavigate();

  // const handleChat = () => {
  //   navigate("/chats");
  // };

  // const handleNotification = () => {
  //   // 알림 모달 띄우기
  // };

  // const handleMyPage = () => {
  //   navigate("/my-info");
  // };

  // 스크롤 이동 시, 헤더 오픈/숨김 처리
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollTop = useRef(0); // useRef로 상태 유지

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // 스크롤을 내리면 헤더를 숨기고, 올리면 다시 보이게
      if (currentScroll > lastScrollTop.current && currentScroll > 100) {
        headerRef.current?.classList.add("hidden");
      } else {
        headerRef.current?.classList.remove("hidden");
      }

      // 현재 스크롤 위치 저장
      lastScrollTop.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeaderContainer ref={headerRef}>
        <LogoContainer>
          <Link to="/">
            <h1>
              <Logo />
            </h1>
          </Link>
        </LogoContainer>
        {!isMainPage && !isChatPage && (
          <button onClick={() => navigate(-1)} title="Go Back">
            <BackIcon />
          </button>
        )}
        {isLogin ? (
          <NavContainer>
            <Link to="/chats">
              <NotificationIconContainer notificationCount={unreadCount}>
                <ContactIcon />
              </NotificationIconContainer>
            </Link>
            {/* <NotificationIconContainer
              notificationCount={1}
              onClick={handleNotification}
            >
              <NotificationIcon />
            </NotificationIconContainer> */}
            <button onClick={toggleDropdown} title="Toggle Profile Dropdown">
              <ProfileImage src={DummyProfileImage} usageType="header" />
            </button>
          </NavContainer>
        ) : (
          /**
           * TODO: 우선 Button 컴포넌트를 사용하고, 텍스트 색상, 버튼 height 같은 디테일한 css는 후반부에 수정
           */
          <Button
            buttonType="outline"
            buttonSize="small"
            label="로그인"
            onClick={handleClick}
          />
        )}
        {isModalOpen &&
          (isLoginView ? (
            <LoginModal
              onClose={handleCloseModal}
              onToggleView={toggleModalView} // 모달 전환 함수 전달
              onLoginSuccess={handleLoginSuccess} // 로그인 성공 시 처리 함수 전달
            />
          ) : (
            <RegisterModal
              onClose={handleCloseModal}
              onToggleView={toggleModalView} // 모달 전환 함수 전달
            />
          ))}
      </HeaderContainer>
      {/**
       * TODO: dropdown 외부 클릭 시 dropdown 닫히는 기능 추가 고려
       */}
      <ProfileDropdown
        isVisible={isDropdownVisible}
        closeDropdown={closeDropdown}
      />
      {showProfileProposal && (
        <ProfileProposal onClose={handleCloseProfileProposal} />
      )}
    </>
  );
};

export default Header;
