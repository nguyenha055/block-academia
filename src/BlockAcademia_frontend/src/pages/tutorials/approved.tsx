import React, { useEffect, useState } from "react";
import { Tutorial } from "./types";
import { useCanister } from "@connect2ic/react";
import Card from "../../components/common/Card";
import { useNavigate } from "react-router-dom";

const Approved = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [backend] = useCanister("BlockAcademia_backend");
  const navigate = useNavigate();


  const fetchTutorials = async () => {
    const res = (await backend.getAprovedPublication()) as Tutorial[];
    console.log("Publications are: ", res);
    if(res.length > 0){
      console.log(res[0].content);
    }
    setTutorials(res);
  };

  useEffect(() => {
    fetchTutorials();
  }, [])

  return (
    <div className="p-10 my-6">
      <div className="flex flex-col gap-5 pt-5">
        {tutorials.map((tutorial, index) => (
          <Card
            key={index}
            title={tutorial?.content.title }
            description={tutorial?.content.description }
            author={tutorial?.autor}
            readTime={5}
            onClick={() => navigate(`/tutorials/${tutorial.id}`) }
            footer={undefined}></Card>
        ))}
      </div>
    </div>
  )
}

export default Approved
