import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Flex, Button, Link, Text } from "@chakra-ui/react";

export const formatFileSize = (sizeInBytes) => {
  const sizeInKiloBytes = sizeInBytes / 1024;

  if (sizeInKiloBytes < 1024) {
    return `${sizeInKiloBytes.toFixed(2)} KB`;
  }

  const sizeInMegaBites = sizeInKiloBytes / 1024;
  return `${sizeInMegaBites.toFixed(2)} MB`;
};

const FileDropZone = ({ onChange, instruction, value, id, disabled }) => {
  const onFileUploaded = useCallback(
    (files) => {
      const file = files[0];
      console.log(files);
      onChange(file);
    },
    [onChange]
  );

  const onRemove = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: onFileUploaded,
    accept: ".csv",
    noClick: true,
    noKeyboard: true,
    disabled,
  });

  if (value) {
    return (
      <Flex alignItems="center">
        <Text>{value.name}</Text>
        <Text ml="1" color="gray.400">
          ({formatFileSize(value.size)})
        </Text>
        <Link
          onClick={disabled ? undefined : onRemove}
          disabled={disabled}
          color="teal"
          fontWeight="semibold"
          ml="1"
        >
          Remove
        </Link>
      </Flex>
    );
  }

  return (
    <Flex
      {...getRootProps()}
      border="1px"
      boxShadow={isDragActive ? "base" : undefined}
      padding="8"
      borderRadius="md"
      borderColor={isDragActive ? "teal.400" : "gray.300"}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.100"
    >
      <input {...getInputProps()} id={id} data-testid={id} />
      <Text color="gray.400">
        {instruction},
        <Link
          onClick={open}
          ml="1"
          color="teal"
          fontWeight="semibold"
          disabled={disabled}
        >
          Szukaj
        </Link>
      </Text>
    </Flex>
  );
};

export default FileDropZone;
