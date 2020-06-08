import React,{Component} from 'react';
import { View, Text,ScrollView,FlatList,StyleSheet,Modal,Button} from 'react-native';
import { Card ,Icon,Input,Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite,postComment} from '../redux/ActionCreators';

const mapStatetoProps=state=>{
    return ({
        dishes:state.dishes,
        comments:state.comments,
        favorites:state.favorites
    });
}

const mapDispatchToProps=dispatch=>({
    postFavorite: (dishId)=>dispatch(postFavorite(dishId)),
    postComment:   (dishId,comment,rating,author)=>dispatch(postComment(dishId, comment, rating,author))
});


function RenderDish(props){
    const dish=props.dish;
    if (dish!=null)
    {
        return(
            <Card featuredTitle={dish.name}
            image={{uri:baseUrl+dish.image}}>
                <Text style={{margin:10}}>
                    {dish.description}
                </Text>
                <View style={{ flexDirection:"row" }}>
                    <Icon
                        raised
                        reverse
                        name={props.favorite?'heart':'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={()=>props.favorite?console.log('Already favorite'):props.onPress()}
                        />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color='#512DA8'
                        onPress={()=>props.onSelect()}
                        />
                    </View>
              
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComments(props){
    const comments=props.comments;
    const renderCommentItem=({item,index})=>{
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize:12}}>{'--'+item.author+', '+item.date}</Text>
            </View>
        )

    }
    return(
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item=>item.id.toString()}
            />

        </Card>
    )
}

class DishDetail extends Component {
    
    constructor(props)
    {
        super(props);
        this.state={
            author:'',
            rating:'',
            comment:'',
            isModalOpen:false
        }
    }

    markFavorite(dishId){
        this.setState({
            favorites:this.props.postFavorite(dishId)
        })
    }

    toggleModal()
    {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    handleComments(dishId)
    {
        this.toggleModal();
        this.props.postComment(dishId,this.state.comment,this.state.rating,this.state.author);

    }

    static navigationOptions={
        title:'Dish Details'
    };
    render(){
        const dishId=this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el=>el===dishId)}
                    onPress={()=>this.markFavorite(dishId)}
                    onSelect={()=>this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment)=>comment.dishId===dishId)}/>
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.isModalOpen}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <View>
                            <Rating 
                                showRating
                                onFinishRating={(rating)=>this.setState({rating:rating})}
                                starting={0}
                                fractions={0}
                                />
                        </View>
                        <View>
                            <Input
                                    placeholder='Author'
                                    leftIcon={
                                        <Icon
                                            name='user-o'
                                            type='font-awesome'
                                            size={24}
                                        />
                                    }
                                    onChangeText={(value) => this.setState({ author: value })}
                                />
                        </View>
                        <View>
                            <Input
                                placeholder="Comment"
                                leftIcon={
                                    <Icon
                                        name='comment-o'
                                        type='font-awesome'
                                        size={24}
                                    />
                                }
                                onChangeText={(value) => this.setState({ comment: value })}
                            />
                        </View>
                        <View>
                            <Button color="#512DA8"
                                title="SUBMIT"
                                onPress={() => this.handleComments(dishId)}
                            
                            />
                        </View>
                        <View>
                            <Button onPress={() => this.toggleModal()}
                                title="Close"
                                
                                margin={10}
                            />
                        </View>

                    </View>
                </Modal>
            </ScrollView>
            
        );
    }
    
}


const styles = StyleSheet.create({
   
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }

});
export default connect(mapStatetoProps,mapDispatchToProps)(DishDetail);