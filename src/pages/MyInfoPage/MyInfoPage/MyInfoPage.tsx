import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonContainer,
  MyInfoEditPageWrapper,
  ProfileContainer,
} from "./MyInfoPage.styled";
import useAuthStore from "../../../store/useAuthStore";
import ProfileImage from "../../../components/common/ProfileImage/ProfileImage";
import ReadInput from "../../../components/common/ReadInput/ReadInput";
import ReadTextArea from "../../../components/common/ReadTextArea/ReadTextArea";
import Button from "../../../components/common/button/Button";
import { SelectOption } from "../../../types/types";
import {
  InterestsOptions,
  AffiliationOptions,
  PositionOptions,
} from "../../../constants/options";
import { fetchUserProfile } from "../../../services/userProfile/fetchUserProfile";

import DummyProfileImage from "../../../assets/profile-image/Dummy-Profile-Image.png";
import useAuthApi from "../../../hooks/useAuthApi";

/**
 * MyInfoPage - 사용자 정보 읽기 전용 페이지
 */
const MyInfoPage = () => {
  const loginEmail = useAuthStore((state) => state.email);
  const setIsLogin = useAuthStore((state) => state.setIsLogin);
  const [userInformation, setUserInformation] = useState({
    inputNickname: "",
    selectPosition: {} as SelectOption,
    selectAffiliation: {} as SelectOption,
    inputIntroduction: "",
    selectInterests: [] as SelectOption[],
  });
  const navigate = useNavigate();

  const { deleteUser } = useAuthApi();

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        if (!loginEmail) {
          navigate("/");
          throw new Error("로그인한 사용자 정보가 없습니다.");
        }

        const userProfileData = await fetchUserProfile(loginEmail);

        setUserInformation({
          inputNickname: userProfileData.nickname,
          selectPosition: PositionOptions.find(
            (option) =>
              (option.value as string).toUpperCase() ===
              userProfileData.position
          ) as SelectOption,
          selectAffiliation: AffiliationOptions.find(
            (option) =>
              (option.value as string).toUpperCase() ===
              userProfileData.affiliation
          ) as SelectOption,
          inputIntroduction: userProfileData.bio,
          selectInterests: InterestsOptions.filter((option) =>
            userProfileData.interests.includes(
              (option.value as string).toUpperCase()
            )
          ),
        });
      } catch (error) {
        console.error("프로필 불러오기 중 오류 발생:", error);
      }
    };

    fetchUserProfileData();
  }, []);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(loginEmail);
      setIsLogin(false);
      navigate("/");
    } catch (error) {
      console.error("회원 탈퇴 중 오류 발생:", error);
    }
  };

  return (
    <MyInfoEditPageWrapper>
      <ProfileContainer>
        <ProfileImage
          src={DummyProfileImage}
          alt="user profile image"
          usageType="userInformation"
        />
        <div style={{ marginTop: "1rem" }}>
          {userInformation.inputNickname} 님 환영해요.
        </div>
      </ProfileContainer>

      <ReadInput
        label="닉네임"
        value={userInformation.inputNickname || "닉네임을 입력해주세요."}
        variant={userInformation.inputNickname ? "default" : "placeholder"}
      />

      <ReadInput
        label="직무"
        value={
          userInformation.selectPosition?.label ||
          "프론트엔드, 백엔드, 풀스택, IOS, 안드로이드 ... "
        }
        variant={
          userInformation.selectPosition?.label ? "default" : "placeholder"
        }
      />

      <ReadInput
        label="소속"
        value={
          userInformation.selectAffiliation?.label ||
          "학생, 직장인, 프리랜서, 취업 준비생"
        }
        variant={
          userInformation.selectAffiliation?.label ? "default" : "placeholder"
        }
      />

      <ReadTextArea
        label="자기소개"
        value={userInformation.inputIntroduction || "자기소개를 입력해주세요."}
        variant={userInformation.inputIntroduction ? "default" : "placeholder"}
      />

      <ReadInput
        label="관심분야"
        value={
          userInformation.selectInterests.length > 0
            ? userInformation.selectInterests
                .map((option) => option.label)
                .join(", ")
            : "무관 or 전체, TypeScript, Java, …"
        }
        variant={
          userInformation.selectInterests.length > 0 ? "default" : "placeholder"
        }
      />

      <ButtonContainer>
        <Button
          label="회원 탈퇴"
          buttonType="outline"
          buttonSize="medium"
          onClick={handleDeleteUser}
        />
        <Button
          label="프로필 수정"
          buttonType="fill"
          buttonSize="medium"
          onClick={() => navigate("./edit")}
        />
      </ButtonContainer>
    </MyInfoEditPageWrapper>
  );
};

export default MyInfoPage;
