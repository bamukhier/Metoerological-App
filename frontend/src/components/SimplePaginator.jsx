import React, { useEffect, useState } from "react";
import {
  useColorMode,
} from "@chakra-ui/react";
import {
  Paginator,
  Container,
  Previous,
  usePaginator,
  Next,
  PageGroup
} from "chakra-paginator";


function SimplePaginator({fetchCoords, handleOffsetChange}) {
    const [coordsTotal, setCoordsTotal] = useState();
    const {colorMode} = useColorMode()
    
  // constants
  const outerLimit = 1;
  const innerLimit = 5;

  
  // styles
  const baseStyles = {
    w: 10,
    mr: 0.5,
    fontSize: "sm"
  };

  const normalStyles = {
    ...baseStyles,
  };

  const activeStyles = {
    ...baseStyles,
    bg: "green.500",
    color: 'white',
    _hover: {
        bg: "green.500",
    }
  };

  const separatorStyles = {
    w: 10,
  };


  const {
    isDisabled,
    pagesQuantity,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    offset // you may not need this most of the times, but it's returned for you anyway
  } = usePaginator({
    total: coordsTotal,
    initialState: {
      pageSize: 5,
      currentPage: 1,
      isDisabled: false
    }
  });

  useEffect(() => {
    console.log('here')
    fetchCoords(pageSize, offset).then((coordsCount) => {
      handleOffsetChange(offset)
      setCoordsTotal(coordsCount);
      console.log(coordsTotal)
    });
  }, [currentPage, pageSize, offset]);


  // handlers
  const handlePageChange = (nextPage) => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  return (
    <>
      {coordsTotal > 5 ? 
        <Paginator
          isDisabled={isDisabled}
          activeStyles={activeStyles}
          innerLimit={innerLimit}
          currentPage={currentPage}
          outerLimit={outerLimit}
          normalStyles={normalStyles}
          separatorStyles={separatorStyles}
          pagesQuantity={pagesQuantity}
          onPageChange={handlePageChange}
        >
          <Container align="center" justify="center" w="full" p={4}>
            <Previous mr={6}>
              Previous
              {/* Or an icon from `react-icons` */}
            </Previous>
            <PageGroup isInline align="center" />
            <Next ml={6}>
              Next
              {/* Or an icon from `react-icons` */}
            </Next>
          </Container>
      </Paginator>
     : null }
    </>
  );
};

export default SimplePaginator;
