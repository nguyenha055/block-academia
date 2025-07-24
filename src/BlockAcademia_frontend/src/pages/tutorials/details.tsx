import { useCanister } from "@connect2ic/react";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Tutorial } from "./types";

const Details = () => {

  const [tutorial, setTutorial] = useState<Tutorial>();
  const [autor, setAutor] = useState<String>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [backend] = useCanister("BlockAcademia_backend");
  const navigate = useNavigate();

  const handleApproval = async (tutoId: number) => {
    try {
      const res = await backend.aprovePublication(tutoId);
      if (res.ok){
        alert("Tutorial approved successfully!");
        navigate("/tutorials/incoming");
      } else {
        alert("Failed to approve tutorial: " + res.err);
      }
    } catch (error) {
      console.error("Error approving tutorial:", error);
      alert("Error approving tutorial");
    }
  };

  const handleReject = async (tutoId: number) => {
    try {
      const res = await backend.rejectPublication(tutoId);
      if (res.ok){
        alert("Tutorial rejected successfully!");
        navigate("/tutorials/incoming");
      } else {
        alert("Failed to reject tutorial: " + res.err);
      }
    } catch (error) {
      console.error("Error rejecting tutorial:", error);
      alert("Error rejecting tutorial");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(undefined);
        
        // Check if user is admin
        const adminStatus = await backend.iamAdmin();
        setIsAdmin(adminStatus);
        
        type Response = { pub: Tutorial; autor: String };
        const _id = BigInt(id!);
        const response = await backend.getPubByID(_id) as Response;
        
        if (response.pub && response.pub.id !== undefined) {
          setAutor(response.autor);
          setTutorial(response.pub);
          
          // Check if this is a pending tutorial by checking incoming publications
          const incomingTutorials = await backend.getIncomingPublication() as Tutorial[];
          const isPendingTutorial = incomingTutorials.some(t => t.id === response.pub.id);
          setIsPending(isPendingTutorial);
        } else {
          setError("Tutorial not found");
        }
      } catch (err) {
        console.error("Error fetching tutorial:", err);
        setError("Failed to load tutorial");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 min-h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl">Loading tutorial...</h2>
        </div>
      </div>
    );
  }

  if (error || !tutorial) {
    return (
      <div className="p-10 min-h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl mb-4">Error 404</h2>
          <h3 className="text-2xl text-gray-600">{error || "Tutorial not found"}</h3>
          <button 
            onClick={() => navigate('/tutorials')}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Back to Tutorials
          </button>
        </div>
      </div>
    );
  }

  // Tutorial found and loaded successfully
  return (
    <div className="p-10 min-h-[90vh]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-5xl text-center">{tutorial.content.title}</h2>
          <span className="text-lg text-center text-gray-600">
            {tutorial.content.description}
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold text-center">
              by {autor || 'Anonymous'}
            </h3>
            <p className="text-center text-gray-500">{tutorial.date}</p>
            {/* Admin approval buttons for pending tutorials */}
            {isAdmin && isPending && (
              <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleApproval(tutorial.id)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 font-semibold"
                >
                  ✓ Approve Tutorial
                </button>
                <button
                  onClick={() => handleReject(tutorial.id)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-semibold"
                >
                  ✗ Reject Tutorial
                </button>
                <button
                  onClick={() => navigate('/tutorials/incoming')}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 font-semibold"
                >
                  Back to Admin Panel
                </button>
              </div>
            )}
            {/* TODO: Add comment section*/}
          </div>
        </div>
        <div className="prose max-w-none mx-auto">
          {tutorial.content.html.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Details
