import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import React from 'react'
import { useRecoilState } from "recoil";
import { classAtom } from "../../../../../recoil/atoms/classAtom";

const Marks = () => {
    const [classes, setClasses] = useRecoilState(classAtom);
    const [currentSelectedCourse, setCurrentSelectedCourse] = React.useState();
    const handleValueChange = (value) => {
      console.log(value);
      const selectedClass = classes.find((item) => item._id === value);
      setCurrentSelectedCourse(selectedClass);
    };
    React.useEffect(() => {}, [currentSelectedCourse]);
  
    // console.log(classes);
    return (
      <div className="w-8/9 my-5">
        <Select className="w-full" onValueChange={handleValueChange}>
          <SelectTrigger className="text-xl p-5 text-gray-600 font-semibold dark:text-gray-100 dark:border-2">
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="text-2xl">
              <SelectLabel>Class</SelectLabel>
              {classes.map((item) => (
                <SelectItem key={item._id} value={item._id}>
                  {`${item.name} - ${item.className}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
}

export default Marks