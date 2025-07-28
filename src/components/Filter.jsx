import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FilterSection from "./FilterSection";
import { states, caste, ministry } from "../utils/Constents";
import { useDispatch } from "react-redux";
import { getFilteredScheme } from "../Reducers/SchemeSlice";

const FiltersSidebar = () => {

    const { register, watch, reset } = useForm();
    const dispatcher = useDispatch();
    let filterValues = watch();

    useEffect(() => {
        applyFilters(filterValues);
    }, [filterValues]);

    const applyFilters = (data) => {
        let filter = "";
        if (data.age) filter += `age=${data.age}&`;
        if (data.state) filter += `state=${data.state}&`;
        if (data.gender) data.gender?.forEach(g => filter += `gender=${g}&`);
        if (data.ministry) data.ministry?.forEach(m => filter += `ministry=${m}&`);
        dispatcher(getFilteredScheme(filter));
    };

    return (
        <div className="w-[80%] bg-white shadow rounded-lg border-slate-400 scroll_hide px-2">
            <div className="flex mt-2 justify-between items-center relative">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button className="text-blue-500 text-sm" onClick={reset}>Reset</button>
                <div className='border-b border-slate-400 w-full absolute -bottom-1' />
            </div>

            <form className="mt-2">
                <FilterSection title="State">
                    <select {...register("state")}
                        className="w-full border rounded px-2 py-1">
                        <option value="">Select</option>
                        {
                            states.map((state) => {
                                return (
                                    <option key={state} value={state}>{state}</option>
                                )
                            })
                        }
                    </select>
                </FilterSection>

                <FilterSection title="Gender">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" {...register("gender")} value="" className="form-checkbox" />
                        <span>All</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" {...register("gender")} value="Female" className="form-checkbox" />
                        <span>Female</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" {...register("gender")} value="Male" className="form-checkbox" />
                        <span>Male</span>
                    </label>
                </FilterSection>

                <FilterSection title="Age">
                    <input type="number" {...register("age")} className="border-2 border-slate-500" min={0} maxLength={2} />
                </FilterSection>


                <FilterSection title="Caste">
                    {caste.map(
                        (item, index) => (
                            <label key={index} className="flex items-center space-x-2">
                                <input type="checkbox" {...register("caste")} value={item} className="form-checkbox" />
                                <span>{item}</span>
                            </label>
                        )
                    )}
                </FilterSection>

                <FilterSection title="Ministry Name">
                    {ministry.map(
                        (item, index) => (
                            <label key={index} className="flex items-center space-x-2">
                                <input type="checkbox" {...register("ministry")} value={item} className="form-checkbox" />
                                <span>{item}</span>
                            </label>
                        )
                    )}
                </FilterSection>

                <input type="submit" value="Apply Filter" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 my-2 " />
            </form>
        </div>
    );
};

export default FiltersSidebar;
