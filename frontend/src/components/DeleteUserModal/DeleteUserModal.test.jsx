import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { jest } from "jest-mock-axios"; // Only import jest from jest-mock-axios
import { describe, expect, it } from "jest";
import DeleteUserModal from "./index";
// import { getBackendUrl } from "../../../env"; // Adjust the path as needed

jest.mock("../../env", () => ({
  getBackendUrl: jest.fn(() => "http://localhost:5000/api"), // Provide a mock URL
}));

// // Mock import.meta.env.VITE_BACKEND_URL
// const originalViteBackendURL = process.env.VITE_BACKEND_URL;
// beforeAll(() => {
//   process.env.VITE_BACKEND_URL = "http://localhost:5000/api"; // Replace with your mocked backend URL
// });

// afterAll(() => {
//   process.env.VITE_BACKEND_URL = originalViteBackendURL;
// });
// jest.mock("axios");

// Mock the useAxios hook
jest.mock("../../hooks/useAxios", () => ({
  __esModule: true,
  ...jest.requireActual("../../hooks/useAxios"),
  default: jest.fn().mockReturnValue({
    response: {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      role_name: "Admin",
    },
  }),
}));

describe("DeleteUserModal", () => {
  it("renders user data and handles delete button click", async () => {
    const setDeleteUserModalMock = jest.fn();
    const selectedUserId = 1;

    render(
      <DeleteUserModal
        setDeleteUserModal={setDeleteUserModalMock}
        selectedUserId={selectedUserId}
      />
    );

    // Ensure user data is rendered
    expect(screen.getByText("Prénom:")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    // ... (similar checks for other user data)

    // Mock the axios delete call
    axios.delete.mockResolvedValueOnce();

    // Simulate clicking the "Effacer" button
    fireEvent.click(screen.getByText("Effacer"));

    // Wait for the axios delete call to be made
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${selectedUserId}`
      );
    });

    // Ensure that the dialog is open after deletion
    expect(screen.getByText("Utilisateur effacée")).toBeInTheDocument();

    // Ensure setDeleteUserModalMock was called after dialog close
    fireEvent.click(screen.getByText("Retourner"));
    expect(setDeleteUserModalMock).toHaveBeenCalledWith(false);
  });
});
