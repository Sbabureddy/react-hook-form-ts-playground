import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("renders headline", () => {
    render(
      <>
        <input
          aria-label="Has Error"
          aria-invalid="true"
          aria-errormessage="error-message"
        />
        <div id="error-message" role="alert">
          This field is invalid
        </div>
      </>
    );

    const hello = screen.getByRole("textbox");

    expect(hello).toHaveAccessibleErrorMessage("This field is invalid");
  });
});
