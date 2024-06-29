import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AccordionUsage from ".";

describe("Accordion", () => {
  it("renders accordion", async () => {
    render(<AccordionUsage />);
    const accordion = screen.getByRole("button", {
      name: /accordion actions/i,
    });
    userEvent.click(accordion);

    expect(
      await screen.findByText(
        /lorem ipsum dolor sit amet, consectetur adipiscing elit\. suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget\./i
      )
    ).toBeInTheDocument();

    const cancelButton = await screen.findByText(/cancel/i);
    expect(cancelButton).toBeInTheDocument();
    userEvent.click(cancelButton);
    expect(
      await screen.findByRole("dialog", {
        name: /Use Google's location service/i,
      })
    ).toBeInTheDocument();
  });
});
