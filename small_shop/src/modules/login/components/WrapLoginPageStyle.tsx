import styled from "@emotion/styled";

export const WrapLoginPageStyle = styled("div")`
  .wrap-form-login {
    position: absolute;
    transform: translateX(-50%);
    top: 200px;
    left: 50%;

    & .form-login {
      width: 600px;
      padding: 50px;
      border-radius: 4px;

      &__title {
        text-align: center;
        color: ${(props) => (props.theme == "light" ? "#111" : "#fff")};
      }

      &__input {
        width: 100%;
      }

      &__form-item {
        margin-bottom: 30px;
      }

      &__button {
        width: 100%;
      }
    }
  }
`;
