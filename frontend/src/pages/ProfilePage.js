import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../components/AuthProvider";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <StyledWrapper>
        <div className="profile-container">
          <p className="title">Not Logged In</p>
          <p className="message">Please sign in to view your profile.</p>
        </div>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <div className="profile-container">
        <p className="title">👤 My Profile</p>
        <div className="details">
          <div className="field">
            <label>Username:</label>
            <span>{user.username || "N/A"}</span>
          </div>
          <div className="field">
            <label>Email:</label>
            <span>{user.email || "N/A"}</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: #0f172a;

  .profile-container {
    width: 400px;
    border-radius: 0.75rem;
    background-color: #111827;
    padding: 2rem;
    color: #f3f4f6;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }

  .title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #374151;
  }

  .field label {
    font-weight: 600;
    color: #9ca3af;
  }

  .field span {
    color: #f3f4f6;
  }

  .message {
    text-align: center;
    font-size: 1rem;
    margin-top: 1rem;
    color: #9ca3af;
  }
`;
