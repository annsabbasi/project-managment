import { useLocation } from 'react-router-dom'
import { axiosInstance } from '../../../api/axiosInstance';

export default function Index() {
    const location = useLocation();
    const { plan, price, features } = location.state;

    const handleClick = async () => {
        const result = await axiosInstance.post('/user/create-subs', { plan, price, features })
        console.log("This is the ", result.data.plan, "plan.")
    }

    return (
        <div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur sed rem omnis id voluptatibus laudantium magni ipsa, dignissimos dolore? Error dolor dolorum non nesciunt. Voluptatum eos aliquid debitis amet labore error doloremque cumque sint. Obcaecati, culpa reiciendis facere voluptates a similique reprehenderit repudiandae magnam neque ducimus eius error mollitia debitis deleniti animi excepturi earum sed. Veniam repellendus eaque sit. Fuga magnam facere omnis impedit iste sunt totam aperiam quaerat atque ipsum a, nisi illo perferendis. Sit laborum corrupti possimus perspiciatis rerum amet atque minima incidunt, fuga omnis ea voluptatem maxime ipsum, harum cumque quaerat eveniet beatae veniam exercitationem! Repellat cupiditate tenetur et assumenda quibusdam incidunt accusantium nemo illum veritatis nisi pariatur modi, sunt, enim facilis ducimus error consectetur nulla! Quos voluptas quasi omnis ab, maxime dolorem sequi voluptatem quaerat ut non molestias inventore reprehenderit sit alias libero esse repellat, architecto cum fuga et maiores molestiae? Blanditiis, cumque nobis. Eum quod distinctio quasi enim rem. Exercitationem autem veniam illum soluta, asperiores cum iste quo. Sint porro velit fugiat totam harum, praesentium commodi fugit, optio veniam necessitatibus minus doloremque fuga repellat iusto magni. Tempore, illo maiores! Voluptates placeat ipsam, soluta nam quis sapiente nisi tempore illum explicabo ad repellendus nesciunt quasi. Eligendi.</p>
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}
