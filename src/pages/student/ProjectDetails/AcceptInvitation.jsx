import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AcceptInvitation = () => {
  const [isAccepting, setIsAccepting] = useState(false);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleAcceptInvitation = async () => {
    try {
      setIsAccepting(true);
      setMessage("");

      const jwtToken = localStorage.getItem("token");

      const response = await fetch(`http://localhost:2000/api/projects/accept_invitation?token=${token}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to accept the invitation.");
      }

      setMessage("You are now a part of the project team!");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsAccepting(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing invitation token.");
    }
  }, [token]);

  return (
    <div className="h-[85vh] flex flex-col justify-center items-center">
      {message && <h1 className="py-5 font-semibold text-xl">{message}</h1>}
      {!message && (
        <Button onClick={handleAcceptInvitation} disabled={isAccepting}>
          {isAccepting ? "Accepting..." : "Accept Invitation"}
        </Button>
      )}
    </div>
  );
};

export default AcceptInvitation;
