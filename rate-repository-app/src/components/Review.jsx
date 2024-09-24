import { StyleSheet, View, Pressable } from "react-native";
import TextInput from "./TextInput";
import { useFormik } from 'formik';
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup"
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "lightgrey"
    },
    errorText: {
        color: "#d73a4a",
        marginLeft: 10
    }
});

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
};

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0)
        .max(100)
        .required("Rating is required")
});

export const ReviewForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "white" }}>
                <TextInput
                    error={formik.errors.ownerName}
                    placeholder="Repository owner name"
                    value={formik.values.ownerName}
                    onChangeText={formik.handleChange('ownerName')}
                />
                {formik.touched.ownerName && formik.errors.ownerName && (
                    <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
                )}
                <TextInput
                    error={formik.errors.repositoryName}
                    placeholder="Repository name"
                    value={formik.values.repositoryName}
                    onChangeText={formik.handleChange('repositoryName')}
                />
                {formik.touched.repositoryName && formik.errors.repositoryName && (
                    <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
                )}
                <TextInput
                    error={formik.errors.rating}
                    placeholder="Rating between 0 and 100"
                    value={formik.values.rating}
                    onChangeText={(text) => {
                        const parsedRating = Number(text) //parse into number
                        formik.setFieldValue('rating', parsedRating)
                    }}
                />
                {formik.touched.rating && formik.errors.rating && (
                    <Text style={styles.errorText}>{formik.errors.rating}</Text>
                )}
                <TextInput
                    error={formik.errors.text}
                    placeholder="Review"
                    value={formik.values.text}
                    onChangeText={formik.handleChange('text')}
                    multiline="true"
                />
                <Pressable style={theme.button} onPress={formik.handleSubmit}>
                    <Text style={{ color: "white" }}>Create a review</Text>
                </Pressable>
            </View>
        </View>
    )
};

const Review = () => {
    const {createReview} = useCreateReview(); //was returned as an object, so we use it as an object

    const navigate = useNavigate();

    const onSubmit = async (values) => {
      const { ownerName, repositoryName, rating, text } = values;
  
      try {
        const data = await createReview({ ownerName, repositoryName, rating, text }); //data is createreview object, so extract repositoryid from it
        navigate(`/repository/${data.repositoryId}`);
      } catch (e) {
        console.log(e);
      }
    };

    return <ReviewForm onSubmit={onSubmit} />
}

export default Review;