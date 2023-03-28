import { defineFeature, StepDefinitions, loadFeature } from "jest-cucumber";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "src/feature/login";

const loginFeature = loadFeature("tests/login/login.feature");

console.log('ksks')

const backgroundStepDefinition: (
  options: Pick<Parameters<StepDefinitions>[0], "given">
) => void = ({ given }) => {
  given("User visit login page", async () => {
    render(<Login />);
    const headingTitle = await screen.findByRole("heading");
    const button = await screen.findByRole("button");
    const inputUsername = screen.getByRole("textbox", {
      name: "username-input",
    });
    const labelUsername = inputUsername.previousElementSibling;
    const inputPassword = screen.getByTestId("password-input");
    const labelPassword = inputPassword.previousElementSibling;
    expect(headingTitle).toHaveTextContent(/^Welcome To Test Login Page$/);
    expect(labelUsername).toHaveTextContent("Username");
    expect(inputUsername).toBeInTheDocument();
    expect(labelPassword).toHaveTextContent("Password");
    expect(inputPassword).toBeInTheDocument();
    expect(button).toHaveTextContent("Login");
  });
};

defineFeature(loginFeature, (test) => {
  test("As a user when I put wrong credentials error message will popout above button click", ({
    given,
    and,
    when,
    then,
  }) => {
    const userDoing = userEvent.setup();

    backgroundStepDefinition({ given });

    and("User input wrong username and password", async () => {
      expect(2).toBe(2);
      const inputUsername = screen.getByRole("textbox", {
        name: "username-input",
      });
      const inputPassword = screen.getByTestId("password-input");

      const username = "mehandsomethankyou";
      const password = "bukanpasswordsaya";

      await userDoing.type(inputUsername, username);
      await userDoing.type(inputPassword, password);

      expect(inputUsername).toHaveValue(username);
      expect(inputPassword).toHaveValue(password);
    });
    when("User click login button", async () => {
      const button = screen.getByRole("button");
      userDoing.click(button);
    });
    then(
      'error message "Username Or Password is not match" will popout above button click',
      async () => {
        const errorInfor = await screen.findByTestId("errorInfo");
        expect(errorInfor).toBeVisible();
        expect(errorInfor).toHaveTextContent(
          /^Username Or Password is not match$/
        );
      }
    );
  });

  test("As a user when I put correct credentials then login will show home page", ({
    given,
    and,
    when,
    then,
  }) => {
    const userDoing = userEvent.setup();

    backgroundStepDefinition({ given });

    and("User input correct username and password", async () => {
      expect(2).toBe(2);
      const inputUsername = screen.getByRole("textbox", {
        name: "username-input",
      });
      const inputPassword = screen.getByTestId("password-input");

      const username = "benar";
      const password = "benar";

      await userDoing.type(inputUsername, username);
      await userDoing.type(inputPassword, password);

      expect(inputUsername).toHaveValue(username);
      expect(inputPassword).toHaveValue(password);
    });
    when("User click login button", async () => {
      const button = screen.getByRole("button");
      userDoing.click(button);
    });
    then(
      'User successfull login and see home page',
      async () => {
        const homePage = await screen.findByText(/^Home Page$/)
        const loginTitle = screen.queryByText(/^Welcome To Test Login Page$/)
        expect(homePage).toBeInTheDocument()
        expect(loginTitle).not.toBeInTheDocument()
      }
    );
  });
});
