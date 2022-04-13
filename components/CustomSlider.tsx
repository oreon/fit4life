import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { getData, storeData } from "../lib/AsyncStorageHelper";
import { today } from "../lib/helpers";
import { useStoreActions, useStoreState } from "../lib/Store";

export default function CustomSlider(props: any) {
  const [slp, setSlpstate] = useState(props.initValue);
  const update_trk = useStoreActions((actions) => actions.update_trk);
  const todays = useStoreState((state) => state.todays);

  // const save = (value: number) => {
  //   const today = new Date();
  //   setSlpstate(value);
  //   if (props?.callback) {
  //     props.callback(props.name, value);
  //   }
  // };

  useEffect(() => {
    async function fetchMyAPI() {
      const data = await getData(today() + "_" + props.name);
      console.log("read slider val ", data);
      if (data != null) {
        const idata = parseInt(data);
        setSlpstate(idata);
      }
    }

    fetchMyAPI();
  }, []);

  const save = async (value) => {
    setSlpstate(value);
    await storeData(today() + "_" + props.name, value + "");
    todays[props.name] = value;
    await update_trk(todays); //TODO : this is resulting in method denied error 405
  };

  //TODO: extract style to props
  return (
    <View style={{ alignSelf: "stretch", alignItems: "center" }}>
      <Text>
        {props.label}: {slp}
      </Text>
      <Slider
        onSlidingComplete={(val) => save(val)}
        style={{ width: "80%", height: 40 }}
        step={1}
        value={slp}
        minimumValue={1}
        maximumValue={10}
      />
    </View>
  );
}
