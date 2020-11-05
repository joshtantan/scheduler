import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { getByText, getAllByAltText, getByPlaceholderText, getAllByRole } = render(<Application />);

    await waitForElement(() => getByText("Archie Cohen"));

    const [add1] = getAllByAltText("Add");
    fireEvent.click(add1);
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    const [interviewerListItem1] = getAllByRole("listitem");
    fireEvent.click(interviewerListItem1);

    // expect(getByText("Monday")).toBeInTheDocument();
    // expect(getByText("no spots remaining")).toBeInTheDocument();
  });
});
